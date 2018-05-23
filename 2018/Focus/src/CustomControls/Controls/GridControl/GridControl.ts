declare const MscrmControls;

namespace Focus2018 {
    export class GridControl {
        private context;
        private filter;

        init(context) {
            this.context = context;
            this.context.parameters.Grid.paging.setPageSize(2);
            this.context.parameters.Grid.refresh();
        }
        destroy() { }
        updateView(context) {
            this.context = context;

            let sorter = this.getSorter();
            let filter = this.getFilter();
            let pager = this.getPager();

            let tiles = this.getTiles();

            return context.factory.createElement("CONTAINER", null, [sorter, filter, pager, tiles]);
        }
        getFilter() {
            let grid = this.context.parameters.Grid;

            let onChange = (e: any) => {
                this.filter = e.target.value;

                if (!this.filter) { grid.filtering.clearFilter(); }

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
        }
        getSorter() {
            let grid = this.context.parameters.Grid;

            let onClick = () => {
                let direction = grid.sorting[0].sortDirection;

                grid.sorting[0] = {
                    name: "fullname",
                    sortDirection: direction ? 0 : 1
                };
                grid.refresh();
            };

            return this.context.factory.createElement("BUTTON", { onClick: onClick }, ["Sort"]);
        }
        getPager() {
            let grid = this.context.parameters.Grid;

            let onClick = (direction: number) => {
                if (direction == 0) {
                    grid.paging.loadPreviousPage();
                } else {
                    grid.paging.loadNextPage();
                }
            }

            let prev = this.context.factory.createElement("BUTTON", { onClick: onClick.bind(this, 0) }, ["Prev"]);
            let next = this.context.factory.createElement("BUTTON", { onClick: onClick.bind(this, 1) }, ["Next"]);

            let style = {
                display: 'inline-block'
            };
            return this.context.factory.createElement("CONTAINER", { style: style }, [prev, next]);
        }
        getTiles() {
            let grid = this.context.parameters.Grid;

            let tiles = Object.keys(grid.records).map(id => {
                let row = grid.records[id];
                return this.getTile(row);
            });

            let style = {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                width: '100%'
            };
            return this.context.factory.createElement("LIST", { style: style }, tiles);
        }
        getTile(row: any): any {
            let grid = this.context.parameters.Grid;

            let values = grid.columns.map(column => {
                let value = row.getFormattedValue(column.name);
                let onClick = () => {
                    var reference = row.getNamedReference();
                    this.context.navigation.openForm({
                        entityId: reference.id,
                        entityName: reference.LogicalName
                    })
                }
                return this.context.factory.createElement("CONTAINER", { onClick: onClick }, [value]);
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
        }
    }
}