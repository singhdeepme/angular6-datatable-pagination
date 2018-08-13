"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NG2DataTable_1 = require("./NG2DataTable");
var NG2Paginator = (function () {
    function NG2Paginator(injectMfTable) {
        var _this = this;
        this.injectMfTable = injectMfTable;
        this.dataLength = 0;
        this.onPageChangeSubscriber = function (event) {
            _this.activePage = event.activePage;
            _this.rowsOnPage = event.rowsOnPage;
            _this.dataLength = event.dataLength;
            _this.lastPage = Math.ceil(_this.dataLength / _this.rowsOnPage);
        };
    }
    NG2Paginator.prototype.ngOnChanges = function (changes) {
        this.mfTable = this.inputMfTable || this.injectMfTable;
        this.onPageChangeSubscriber(this.mfTable.getPage());
        this.mfTable.onPageChange.subscribe(this.onPageChangeSubscriber);
    };
    NG2Paginator.prototype.setPage = function (pageNumber) {
        this.mfTable.setPage(pageNumber, this.rowsOnPage);
    };
    NG2Paginator.prototype.setRowsOnPage = function (rowsOnPage) {
        this.mfTable.setPage(this.activePage, rowsOnPage);
    };
    return NG2Paginator;
}());
NG2Paginator.decorators = [
    { type: core_1.Component, args: [{
                selector: "mfPaginator",
                template: "<ng-content></ng-content>"
            },] },
];
NG2Paginator.ctorParameters = function () { return [
    { type: NG2DataTable_1.NG2DataTable, decorators: [{ type: core_1.Optional },] },
]; };
NG2Paginator.propDecorators = {
    'inputMfTable': [{ type: core_1.Input, args: ["mfTable",] },],
};
exports.NG2Paginator = NG2Paginator;
//# sourceMappingURL=NG2Paginator.js.map