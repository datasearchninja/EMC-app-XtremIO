require.config({
    paths: {
        "app": "../app"
    }
});
require(['splunkjs/mvc/simplexml/ready!'], function(){
    require(['splunkjs/ready!',"splunkjs/mvc/searchmanager","splunkjs/mvc/postprocessmanager","splunkjs/mvc/simplexml/element/single","app/EMC-app-XtremIO/components/clusterdetails/clusterdetailview"], function(){
    	require(["css!../app/EMC-app-XtremIO/donutchart.css","css!../app/EMC-app-XtremIO/custom_single_test.css","css!../app/EMC-app-XtremIO/table_decorations.css"]);
        // The splunkjs/ready loader script will automatically instantiate all elements
        // declared in the dashboard's HTML.
        var SearchManager = require("splunkjs/mvc/searchmanager");
        var SingleElement = require("splunkjs/mvc/simplexml/element/single");
        var clusterdetailview = require("app/EMC-app-XtremIO/components/clusterdetails/clusterdetailview");
        var mvc = require("splunkjs/mvc");
        var $ = require("jquery");

        var search20 = new SearchManager({
            "id": "search20",
            "latest_time": "now",
            "status_buckets": 0,
            "cancelOnUnload": true,
            "earliest_time": "-60m@m",
            "search": "| inputlookup XtremIOClustersLookup | search \"Cluster Name\"=$cluster$ | table \"Cluster Name\" ,\"XtremIO Server\",\"System Start Time\",\"XIOS Version\",Health, \"Overall Efficiency\",\"Data Reduction Ratio\",\"Dedup Ratio\",\"Compression Ratio\",\"Thin Provisioning Savings\",\"Physical Space In Use\",\"Logical Space In Use\",\"Total Capacity\"  ",
            "auto_cancel": 90,
            "preview": true,
            "runWhenTimeIsUndefined": false
        }, {tokens: true, tokenNamespace: "submitted"});

        var element20 = new clusterdetailview({
            "id": "element20",
            "managerid": "search20",
  "cluster_name": "-",
            "el": $('#summary')
        }, {tokens: true, tokenNamespace: "submitted"}).render();


        });


   

    
});
