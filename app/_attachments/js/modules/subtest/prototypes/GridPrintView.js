// Generated by CoffeeScript 1.4.0
var GridPrintView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

GridPrintView = (function(_super) {

  __extends(GridPrintView, _super);

  function GridPrintView() {
    return GridPrintView.__super__.constructor.apply(this, arguments);
  }

  GridPrintView.prototype.initialize = function(options) {
    this.model = this.options.model;
    return this.parent = this.options.parent;
  };

  GridPrintView.prototype.className = "grid_prototype";

  GridPrintView.prototype.render = function() {
    switch (this.format) {
      case "content":
        this.renderContent();
        break;
      case "stimuli":
        this.renderStimuli();
        break;
      case "backup":
        this.renderBackup();
    }
    return this.parent.trigger("rendered", this);
  };

  GridPrintView.prototype.renderStimuli = function() {
    var index,
      _this = this;
    this.$el.html("      <div id='" + (this.model.get("_id")) + "' class='print-page'>        <table>          <tr>            " + (index = 0, _.map(this.model.get("items"), function(item) {
      var itemText;
      index += 1;
      itemText = "<td class='item'>" + item + "</td>";
      if (index % _this.model.get("columns") === 0 && index !== _this.model.get("items").length) {
        itemText += "</tr><tr>";
      } else {
        "";

      }
      return itemText;
    }).join("")) + "          </tr>        </table>      </div>    ");
    return _.delay(function() {
      var currentSize, overflow;
      overflow = 100;
      while ($("#" + (_this.model.get("_id")))[0].scrollWidth > $("#" + (_this.model.get("_id")) + " table").innerWidth() && $("#" + (_this.model.get("_id")))[0].scrollHeight > $("#" + (_this.model.get("_id")) + " table").innerHeight()) {
        if ((overflow -= 1) === 0) {
          break;
        }
        console.log($("#" + (_this.model.get("_id")))[0].scrollWidth);
        console.log($("#" + (_this.model.get("_id")) + " table").innerWidth());
        currentSize = $("#" + (_this.model.get("_id")) + " td").css("font-size");
        $("#" + (_this.model.get("_id")) + " td").css("font-size", "" + (parseInt(currentSize) + 5) + "px");
        $("#navigation").hide();
        $("#footer").hide();
      }
      currentSize = $("#" + (_this.model.get("_id")) + " td").css("font-size");
      return $("#" + (_this.model.get("_id")) + " td").css("font-size", "" + (parseInt(currentSize) - 10) + "px");
    }, 1000);
  };

  GridPrintView.prototype.renderContent = function() {
    var fields,
      _this = this;
    fields = "autostop    captureAfterSeconds    captureItemAtTime    columns    endOfLine    fontSize    layoutMode    order    randomize    timer    variableName";
    fields = fields.split(/\ +/);
    return this.$el.html("      Properties:<br/>      <table>      " + (_.map(fields, function(field) {
      return "<tr><td>" + field + "</td><td>" + (_this.model.get(field)) + "</td></tr>";
    }).join("")) + "      </table>      Items:<br/>      " + (_.map(this.model.get("items"), function(item) {
      return item;
    }).join(", ")) + "    ");
  };

  return GridPrintView;

})(Backbone.View);
