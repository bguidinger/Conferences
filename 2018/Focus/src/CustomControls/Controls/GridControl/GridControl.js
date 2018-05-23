var Focus2018;
(function (Focus2018) {
    var GridControl = /** @class */ (function () {
        function GridControl() {
        }
        GridControl.prototype.init = function (context) {
            this.context = context;
            this.context.parameters.Grid.paging.setPageSize(2);
            this.context.parameters.Grid.refresh();
        };
        GridControl.prototype.destroy = function () { };
        GridControl.prototype.updateView = function (context) {
            this.context = context;
            var sorter = this.getSorter();
            var filter = this.getFilter();
            var pager = this.getPager();
            var tiles = this.getTiles();
            return context.factory.createElement("CONTAINER", null, [sorter, filter, pager, tiles]);
        };
        GridControl.prototype.getFilter = function () {
            var _this = this;
            var grid = this.context.parameters.Grid;
            var onChange = function (e) {
                _this.filter = e.target.value;
                if (!_this.filter) {
                    grid.filtering.clearFilter();
                }
                grid.filtering.setFilter({
                    filterOperator: 0,
                    conditions: [{
                            attributeName: 'fullname',
                            conditionOperator: 6,
                            value: '%' + e.target.value + '%'
                        }]
                });
                grid.refresh();
            };
            return this.context.factory.createElement("TEXTINPUT", { value: this.filter, onChange: onChange });
        };
        GridControl.prototype.getSorter = function () {
            var grid = this.context.parameters.Grid;
            var onClick = function () {
                var direction = grid.sorting[0].sortDirection;
                grid.sorting[0] = {
                    name: "fullname",
                    sortDirection: direction ? 0 : 1
                };
                grid.refresh();
            };
            return this.context.factory.createElement("BUTTON", { onClick: onClick }, ["Sort"]);
        };
        GridControl.prototype.getPager = function () {
            var grid = this.context.parameters.Grid;
            var onClick = function (direction) {
                if (direction == 0) {
                    grid.paging.loadPreviousPage();
                }
                else {
                    grid.paging.loadNextPage();
                }
            };
            var prev = this.context.factory.createElement("BUTTON", { onClick: onClick.bind(this, 0) }, ["Prev"]);
            var next = this.context.factory.createElement("BUTTON", { onClick: onClick.bind(this, 1) }, ["Next"]);
            var style = {
                display: 'inline-block'
            };
            return this.context.factory.createElement("CONTAINER", { style: style }, [prev, next]);
        };
        GridControl.prototype.getTiles = function () {
            var _this = this;
            var grid = this.context.parameters.Grid;
            var tiles = Object.keys(grid.records).map(function (id) {
                var row = grid.records[id];
                return _this.getTile(row);
            });
            var style = {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                width: '100%'
            };
            return this.context.factory.createElement("LIST", { style: style }, tiles);
        };
        GridControl.prototype.getTile = function (row) {
            var _this = this;
            var grid = this.context.parameters.Grid;
            var values = grid.columns.map(function (column) {
                var value = row.getFormattedValue(column.name);
                var onClick = function () {
                    var reference = row.getNamedReference();
                    _this.context.navigation.openForm({
                        entityId: reference.id,
                        entityName: reference.LogicalName
                    });
                };
                return _this.context.factory.createElement("CONTAINER", { onClick: onClick }, [value]);
            });
            var style = {
                borderLeft: '0.25rem solid gray',
                listStyleType: 'none',
                cursor: 'pointer',
                margin: '0.5rem 0',
                padding: '0.5rem',
                width: '45%'
            };
            return this.context.factory.createElement("LISTITEM", { style: style }, values);
        };
        return GridControl;
    }());
    Focus2018.GridControl = GridControl;
})(Focus2018 || (Focus2018 = {}));
