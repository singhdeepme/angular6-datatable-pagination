"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var NG2BootstrapPaginator = (function () {
    function NG2BootstrapPaginator() {
        this.rowsOnPageSet = [];
        this.minRowsOnPage = 0;
    }
    NG2BootstrapPaginator.prototype.ngOnChanges = function (changes) {
        if (changes.rowsOnPageSet) {
            this.minRowsOnPage = _.min(this.rowsOnPageSet);
        }
    };
    return NG2BootstrapPaginator;
}());
NG2BootstrapPaginator.decorators = [
    { type: core_1.Component, args: [{
                selector: "mfBootstrapPaginator",
                template: "\n    <mfPaginator #p [mfTable]=\"mfTable\">\n      <div class=\"row bootstrap-paginator-footer\">\n        <div class=\"col-md-4 total-summary\">\n          <label class=\"pull-left\">\n            Showing {{p.activePage * p.rowsOnPage - p.rowsOnPage + 1}} to\n            {{(p.activePage * p.rowsOnPage) < p.dataLength ? (p.activePage * p.rowsOnPage) : p.dataLength }} of\n            {{p.dataLength}} entries\n          </label>\n        </div>\n        <div class=\"col-md-4 pages\">\n          <ul class=\"pagination\" *ngIf=\"p.dataLength > p.rowsOnPage\">\n              <li class=\"page-item\" [class.disabled]=\"p.activePage <= 1\" (click)=\"p.setPage(1)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">&laquo;</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage > 4 && p.activePage + 1 > p.lastPage\" (click)=\"p.setPage(p.activePage - 4)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-4}}</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage > 3 && p.activePage + 2 > p.lastPage\" (click)=\"p.setPage(p.activePage - 3)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-3}}</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage > 2\" (click)=\"p.setPage(p.activePage - 2)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-2}}</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage > 1\" (click)=\"p.setPage(p.activePage - 1)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage-1}}</a>\n              </li>\n              <li class=\"page-item active\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage}}</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage + 1 <= p.lastPage\" (click)=\"p.setPage(p.activePage + 1)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+1}}</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage + 2 <= p.lastPage\" (click)=\"p.setPage(p.activePage + 2)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+2}}</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage + 3 <= p.lastPage && p.activePage < 3\" (click)=\"p.setPage(p.activePage + 3)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+3}}</a>\n              </li>\n              <li class=\"page-item\" *ngIf=\"p.activePage + 4 <= p.lastPage && p.activePage < 2\" (click)=\"p.setPage(p.activePage + 4)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{p.activePage+4}}</a>\n              </li>\n              <li class=\"page-item\" [class.disabled]=\"p.activePage >= p.lastPage\" (click)=\"p.setPage(p.lastPage)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">&raquo;</a>\n              </li>\n            </ul>\n          </div>\n          <div class=\"col-md-4 items\">\n            <ul class=\"pagination pull-right float-sm-right\" *ngIf=\"p.dataLength > minRowsOnPage\">\n              <li class=\"page-item\" *ngFor=\"let rows of rowsOnPageSet\" [class.active]=\"p.rowsOnPage===rows\" (click)=\"p.setRowsOnPage(rows)\">\n                  <a class=\"page-link\" style=\"cursor: pointer\">{{rows}}</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n    </mfPaginator>\n    "
            },] },
];
NG2BootstrapPaginator.ctorParameters = function () { return []; };
NG2BootstrapPaginator.propDecorators = {
    'rowsOnPageSet': [{ type: core_1.Input, args: ["rowsOnPageSet",] },],
    'mfTable': [{ type: core_1.Input, args: ["mfTable",] },],
};
exports.NG2BootstrapPaginator = NG2BootstrapPaginator;
//# sourceMappingURL=NG2BootstrapPaginator.js.map