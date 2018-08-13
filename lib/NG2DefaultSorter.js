"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NG2DataTable_1 = require("./NG2DataTable");
var NG2DefaultSorter = (function () {
    function NG2DefaultSorter(mfTable) {
        this.mfTable = mfTable;
        this.isSortedByMeAsc = false;
        this.isSortedByMeDesc = false;
    }
    NG2DefaultSorter.prototype.ngOnInit = function () {
        var _this = this;
        this.mfTable.onSortChange.subscribe(function (event) {
            _this.isSortedByMeAsc = (event.sortBy == _this.sortBy && event.sortOrder == "asc");
            _this.isSortedByMeDesc = (event.sortBy == _this.sortBy && event.sortOrder == "desc");
        });
    };
    NG2DefaultSorter.prototype.sort = function () {
        if (this.isSortedByMeAsc) {
            this.mfTable.setSort(this.sortBy, "desc");
        }
        else {
            this.mfTable.setSort(this.sortBy, "asc");
        }
    };
    return NG2DefaultSorter;
}());
NG2DefaultSorter.decorators = [
    { type: core_1.Component, args: [{
                selector: "mfDefaultSorter",
                template: "\n        <a style=\"cursor: pointer\" (click)=\"sort()\" class=\"text-nowrap\">\n            <ng-content></ng-content>\n            <span *ngIf=\"isSortedByMeAsc\" class=\"glyphicon glyphicon-triangle-top\" aria-hidden=\"true\"></span>\n            <span *ngIf=\"isSortedByMeDesc\" class=\"glyphicon glyphicon-triangle-bottom\" aria-hidden=\"true\"></span>\n        </a>"
            },] },
];
NG2DefaultSorter.ctorParameters = function () { return [
    { type: NG2DataTable_1.NG2DataTable, },
]; };
NG2DefaultSorter.propDecorators = {
    'sortBy': [{ type: core_1.Input, args: ["by",] },],
};
exports.NG2DefaultSorter = NG2DefaultSorter;
//# sourceMappingURL=NG2DefaultSorter.js.map