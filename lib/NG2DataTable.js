"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var Rx_1 = require("rxjs/Rx");
var NG2DataTable = (function () {
    function NG2DataTable(differs) {
        this.differs = differs;
        this.inputData = [];
        this.sortBy = "";
        this.sortOrder = "asc";
        this.sortByChange = new core_1.EventEmitter();
        this.sortOrderChange = new core_1.EventEmitter();
        this.onServerPageChange = new core_1.EventEmitter();
        this.rowsOnPage = 1000;
        this.activePage = 1;
        this.amountOfRows = 0;
        this.isServerPaginationage = true;
        this.mustRecalculateData = false;
        this.onSortChange = new Rx_1.ReplaySubject(1);
        this.onPageChange = new core_1.EventEmitter();
        this.diff = differs.find([]).create(null);
    }
    NG2DataTable.prototype.getSort = function () {
        return { sortBy: this.sortBy, sortOrder: this.sortOrder };
    };
    NG2DataTable.prototype.setSort = function (sortBy, sortOrder) {
        if (this.sortBy !== sortBy || this.sortOrder !== sortOrder) {
            this.sortBy = sortBy;
            this.sortOrder = _.includes(["asc", "desc"], sortOrder) ? sortOrder : "asc";
            this.mustRecalculateData = true;
            this.onSortChange.next({ sortBy: sortBy, sortOrder: sortOrder });
            this.sortByChange.emit(this.sortBy);
            this.sortOrderChange.emit(this.sortOrder);
        }
    };
    NG2DataTable.prototype.getPage = function () {
        return { activePage: this.activePage, rowsOnPage: this.rowsOnPage, dataLength: this.inputData.length };
    };
    NG2DataTable.prototype.setPage = function (activePage, rowsOnPage) {
        if (this.rowsOnPage !== rowsOnPage || this.activePage !== activePage) {
            this.activePage = this.activePage !== activePage ? activePage : this.calculateNewActivePage(this.rowsOnPage, rowsOnPage);
            this.rowsOnPage = rowsOnPage;
            this.mustRecalculateData = true;
            if (this.isServerPaginationage)
                this.onServerPageChange.emit({
                    activePage: this.activePage,
                    rowsOnPage: this.rowsOnPage,
                    dataLength: this.amountOfRows
                });
            else
                this.onPageChange.emit({
                    activePage: this.activePage,
                    rowsOnPage: this.rowsOnPage,
                    dataLength: this.inputData ? this.inputData.length : 0
                });
        }
    };
    NG2DataTable.prototype.calculateNewActivePage = function (previousRowsOnPage, currentRowsOnPage) {
        var firstRowOnPage = (this.activePage - 1) * previousRowsOnPage + 1;
        return Math.ceil(firstRowOnPage / currentRowsOnPage);
    };
    NG2DataTable.prototype.recalculatePage = function () {
        var lastPage = Math.ceil(this.amountOfRows / this.rowsOnPage);
        this.activePage = lastPage < this.activePage ? lastPage : this.activePage;
        this.activePage = this.activePage || 1;
        if (this.isServerPaginationage) {
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.amountOfRows
            });
        }
        else {
            this.onPageChange.emit({
                activePage: this.activePage,
                rowsOnPage: this.rowsOnPage,
                dataLength: this.inputData.length
            });
        }
    };
    NG2DataTable.prototype.ngOnChanges = function (changes) {
        if (changes["rowsOnPage"] && !this.isServerPaginationage) {
            this.rowsOnPage = changes["rowsOnPage"].previousValue;
            this.setPage(this.activePage, changes["rowsOnPage"].currentValue);
            this.mustRecalculateData = true;
        }
        if (changes["sortBy"] || changes["sortOrder"]) {
            if (!_.includes(["asc", "desc"], this.sortOrder)) {
                console.warn("angular2-serverpagination-datatable: value for input mfSortOrder must be one of ['asc', 'desc'], but is:", this.sortOrder);
                this.sortOrder = "asc";
            }
            if (this.sortBy) {
                this.onSortChange.next({ sortBy: this.sortBy, sortOrder: this.sortOrder });
            }
            this.mustRecalculateData = true;
        }
        if (changes["inputData"]) {
            this.inputData = changes["inputData"].currentValue || [];
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
    };
    NG2DataTable.prototype.ngDoCheck = function () {
        var changes = this.diff.diff(this.inputData);
        if (changes) {
            this.recalculatePage();
            this.mustRecalculateData = true;
        }
        if (this.mustRecalculateData) {
            this.fillData();
            this.mustRecalculateData = false;
        }
    };
    NG2DataTable.prototype.fillData = function () {
        this.activePage = this.activePage;
        this.rowsOnPage = this.rowsOnPage;
        var offset = (this.activePage - 1) * this.rowsOnPage;
        var data = this.inputData;
        var sortBy = this.sortBy;
        if (!this.isServerPaginationage) {
            if (typeof sortBy === 'string' || sortBy instanceof String) {
                data = _.orderBy(data, this.caseInsensitiveIteratee(sortBy), [this.sortOrder]);
            }
            else {
                data = _.orderBy(data, sortBy, [this.sortOrder]);
            }
            data = _.slice(data, offset, offset + this.rowsOnPage);
        }
        this.data = data;
    };
    NG2DataTable.prototype.caseInsensitiveIteratee = function (sortBy) {
        return function (row) {
            var value = row;
            for (var _i = 0, _a = sortBy.split('.'); _i < _a.length; _i++) {
                var sortByProperty = _a[_i];
                if (value) {
                    value = value[sortByProperty];
                }
            }
            if (value && typeof value === 'string' || value instanceof String) {
                return value.toLowerCase();
            }
            return value;
        };
    };
    return NG2DataTable;
}());
NG2DataTable.decorators = [
    { type: core_1.Directive, args: [{
                selector: 'table[mfData]',
                exportAs: 'mfDataTable'
            },] },
];
NG2DataTable.ctorParameters = function () { return [
    { type: core_1.IterableDiffers, },
]; };
NG2DataTable.propDecorators = {
    'inputData': [{ type: core_1.Input, args: ["mfData",] },],
    'sortBy': [{ type: core_1.Input, args: ["mfSortBy",] },],
    'sortOrder': [{ type: core_1.Input, args: ["mfSortOrder",] },],
    'sortByChange': [{ type: core_1.Output, args: ["mfSortByChange",] },],
    'sortOrderChange': [{ type: core_1.Output, args: ["mfSortOrderChange",] },],
    'onServerPageChange': [{ type: core_1.Output, args: ["mfOnPageChange",] },],
    'rowsOnPage': [{ type: core_1.Input, args: ["mfRowsOnPage",] },],
    'activePage': [{ type: core_1.Input, args: ["mfActivePage",] },],
    'amountOfRows': [{ type: core_1.Input, args: ["mfAmountOfRows",] },],
    'isServerPaginationage': [{ type: core_1.Input, args: ["mfIsServerPagination",] },],
};
exports.NG2DataTable = NG2DataTable;
//# sourceMappingURL=NG2DataTable.js.map