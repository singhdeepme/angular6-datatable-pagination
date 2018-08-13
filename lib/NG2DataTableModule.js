"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var NG2DataTable_1 = require("./NG2DataTable");
var NG2DefaultSorter_1 = require("./NG2DefaultSorter");
var NG2Paginator_1 = require("./NG2Paginator");
var NG2BootstrapPaginator_1 = require("./NG2BootstrapPaginator");
var NG2DataTableModule = (function () {
    function NG2DataTableModule() {
    }
    return NG2DataTableModule;
}());
NG2DataTableModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule
                ],
                declarations: [
                    NG2DataTable_1.NG2DataTable,
                    NG2DefaultSorter_1.NG2DefaultSorter,
                    NG2Paginator_1.NG2Paginator,
                    NG2BootstrapPaginator_1.NG2BootstrapPaginator
                ],
                exports: [
                    NG2DataTable_1.NG2DataTable,
                    NG2DefaultSorter_1.NG2DefaultSorter,
                    NG2Paginator_1.NG2Paginator,
                    NG2BootstrapPaginator_1.NG2BootstrapPaginator
                ]
            },] },
];
NG2DataTableModule.ctorParameters = function () { return []; };
exports.NG2DataTableModule = NG2DataTableModule;
//# sourceMappingURL=NG2DataTableModule.js.map