"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.System = undefined;

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _sat = require("sat");

var _sat2 = _interopRequireDefault(_sat);

var _rbush = require("rbush");

var _rbush2 = _interopRequireDefault(_rbush);

var _model = require("./model");

var _box = require("./bodies/box");

var _circle = require("./bodies/circle");

var _polygon = require("./bodies/polygon");

var _point = require("./bodies/point");

var _utils = require("./utils");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

/**
 * collision system
 */
var System = (exports.System = (function (_RBush) {
  _inherits(System, _RBush);

  function System() {
    _classCallCheck(this, System);

    var _this = _possibleConstructorReturn(
      this,
      (System.__proto__ || Object.getPrototypeOf(System)).apply(this, arguments)
    );

    _this.response = new _sat2.default.Response();
    return _this;
  }
  /**
   * draw bodies
   * @param {CanvasRenderingContext2D} context
   */

  _createClass(System, [
    {
      key: "draw",
      value: function draw(context) {
        this.all().forEach(function (body) {
          body.draw(context);
        });
      },
      /**
       * draw hierarchy
       * @param {CanvasRenderingContext2D} context
       */
    },
    {
      key: "drawBVH",
      value: function drawBVH(context) {
        this.data.children.forEach(function (_ref) {
          var minX = _ref.minX,
            maxX = _ref.maxX,
            minY = _ref.minY,
            maxY = _ref.maxY;

          _polygon.Polygon.prototype.draw.call(
            {
              pos: { x: minX, y: minY },
              calcPoints: (0, _utils.createBox)(maxX - minX, maxY - minY),
            },
            context
          );
        });
        this.all().forEach(function (body) {
          var _body$getAABBAsBox = body.getAABBAsBox(),
            pos = _body$getAABBAsBox.pos,
            w = _body$getAABBAsBox.w,
            h = _body$getAABBAsBox.h;

          _polygon.Polygon.prototype.draw.call(
            {
              pos: pos,
              calcPoints: (0, _utils.createBox)(w, h),
            },
            context
          );
        });
      },
      /**
       * update body aabb and in tree
       * @param {object} body
       */
    },
    {
      key: "updateBody",
      value: function updateBody(body) {
        this.remove(body);
        body.updateAABB();
        this.insert(body);
      },
      /**
       * update all bodies aabb
       */
    },
    {
      key: "update",
      value: function update() {
        var _this2 = this;

        this.all().forEach(function (body) {
          // no need to every cycle update static body aabb
          if (!body.isStatic) {
            _this2.updateBody(body);
          }
        });
      },
      /**
       * separate (move away) colliders
       */
    },
    {
      key: "separate",
      value: function separate() {
        var _this3 = this;

        this.checkAll(function (response) {
          // static bodies and triggers do not move back / separate
          if (response.a.isTrigger) {
            return;
          }
          response.a.pos.x -= response.overlapV.x;
          response.a.pos.y -= response.overlapV.y;
          _this3.updateBody(response.a);
        });
      },
      /**
       * check one collider collisions with callback
       * @param {function} callback
       */
    },
    {
      key: "checkOne",
      value: function checkOne(body, callback) {
        var _this4 = this;

        // no need to check static body collision
        if (body.isStatic) {
          return;
        }
        this.getPotentials(body).forEach(function (candidate) {
          if (_this4.checkCollision(body, candidate)) {
            callback(_this4.response);
          }
        });
      },
      /**
       * check all colliders collisions with callback
       * @param {function} callback
       */
    },
    {
      key: "checkAll",
      value: function checkAll(callback) {
        var _this5 = this;

        this.all().forEach(function (body) {
          _this5.checkOne(body, callback);
        });
      },
      /**
       * get object potential colliders
       * @param {object} collider
       */
    },
    {
      key: "getPotentials",
      value: function getPotentials(body) {
        // filter here is required as collides with self
        return this.search(body).filter(function (candidate) {
          return candidate !== body;
        });
      },
      /**
       * check do 2 objects collide
       * @param {object} collider
       * @param {object} candidate
       */
    },
    {
      key: "checkCollision",
      value: function checkCollision(body, candidate) {
        this.response.clear();
        if (
          body.type === _model.Types.Circle &&
          candidate.type === _model.Types.Circle
        ) {
          return _sat2.default.testCircleCircle(body, candidate, this.response);
        }
        if (
          body.type === _model.Types.Circle &&
          candidate.type !== _model.Types.Circle
        ) {
          return _sat2.default.testCirclePolygon(
            body,
            candidate,
            this.response
          );
        }
        if (
          body.type !== _model.Types.Circle &&
          candidate.type === _model.Types.Circle
        ) {
          return _sat2.default.testPolygonCircle(
            body,
            candidate,
            this.response
          );
        }
        if (
          body.type !== _model.Types.Circle &&
          candidate.type !== _model.Types.Circle
        ) {
          return _sat2.default.testPolygonPolygon(
            body,
            candidate,
            this.response
          );
        }
      },
      /**
       * create point
       * @param {Vector} position {x, y}
       */
    },
    {
      key: "createPoint",
      value: function createPoint(position) {
        var point = new _point.Point(position);
        this.insert(point);
        return point;
      },
      /**
       * create circle
       * @param {Vector} position {x, y}
       * @param {number} radius
       */
    },
    {
      key: "createCircle",
      value: function createCircle(position, radius) {
        var circle = new _circle.Circle(position, radius);
        this.insert(circle);
        return circle;
      },
      /**
       * create box
       * @param {Vector} position {x, y}
       * @param {number} width
       * @param {number} height
       * @param {number} angle
       */
    },
    {
      key: "createBox",
      value: function createBox(position, width, height) {
        var angle =
          arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        var box = new _box.Box(position, width, height);
        box.setAngle(angle);
        this.insert(box);
        return box;
      },
      /**
       * create polygon
       * @param {Vector} position {x, y}
       * @param {Vector[]} points
       * @param {number} angle
       */
    },
    {
      key: "createPolygon",
      value: function createPolygon(position, points) {
        var angle =
          arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var polygon = new _polygon.Polygon(position, points);
        polygon.setAngle(angle);
        this.insert(polygon);
        return polygon;
      },
    },
  ]);

  return System;
})(_rbush2.default));