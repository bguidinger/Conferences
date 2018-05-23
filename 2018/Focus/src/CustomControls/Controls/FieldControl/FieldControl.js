var Focus2018;
(function (Focus2018) {
    var FieldControl = /** @class */ (function () {
        function FieldControl() {
            this.init = function (context, notifyOutputChanged) {
                var _this = this;
                this.props = {
                    onBlur: function () {
                        notifyOutputChanged();
                    },
                    onChange: function (e) {
                        _this.props.value = e.target.value;
                    }
                };
            };
            this.updateView = function (context) {
                this.props.value = context.parameters.value.raw;
                this.props.style = {
                    color: context.parameters.color.raw
                };
                return context.factory.createElement("TEXTINPUT", this.props);
            };
        }
        FieldControl.prototype.getOutputs = function () {
            return { value: this.props.value };
        };
        return FieldControl;
    }());
    Focus2018.FieldControl = FieldControl;
})(Focus2018 || (Focus2018 = {}));
