namespace Focus2018 {
    export class FieldControl {
        private props;

        init = function (context, notifyOutputChanged) {
            this.props = {
                onBlur: () => {
                    notifyOutputChanged();
                },
                onChange: (e) => {
                    this.props.value = e.target.value;
                }
            };
        }

        updateView = function (context) {
            this.props.value = context.parameters.value.raw;
			this.props.style = {
				color: context.parameters.color.raw
			};

            return context.factory.createElement("TEXTINPUT", this.props);
        }

        getOutputs() {
            return { value: this.props.value }
        }
    }
}