require.config({
    paths: {
        "app": "../app"
    }
});
require(['splunkjs/mvc/simplexml/ready!'], function(){
    require(['splunkjs/ready!',"splunkjs/mvc/searchmanager","splunkjs/mvc/postprocessmanager","splunkjs/mvc/simplexml/element/single","app/EMC-app-XtremIO/components/volumedetails/volumedetailview"], function(){
    	require(["css!../app/EMC-app-XtremIO/donutchart.css","css!../app/EMC-app-XtremIO/custom_single_test.css"]);
        // The splunkjs/ready loader script will automatically instantiate all elements
        // declared in the dashboard's HTML.
        var SearchManager = require("splunkjs/mvc/searchmanager");
        var SingleElement = require("splunkjs/mvc/simplexml/element/single");
        var volumedetailview = require("app/EMC-app-XtremIO/components/volumedetails/volumedetailview");
        var mvc = require("splunkjs/mvc");
        var $ = require("jquery");

        var search20 = new SearchManager({
            "id": "search20",
            "latest_time": "now",
            "status_buckets": 0,
            "cancelOnUnload": true,
            "earliest_time": "-60m@m",
            "search": "| inputlookup XtremIOVolumesLookup | search \"Cluster Name\"=$cluster$ \"Volume Name\" =$volume$|table \"Volume Name\",\"Creation Timestamp\" ,\"Total Snapshots\",\"Total Lun Mappings\",\"Logical Block Size\",\"Logical Space Used\", \"Volume Size\"  ",
            "auto_cancel": 90,
            "preview": true,
            "runWhenTimeIsUndefined": false
        }, {tokens: true, tokenNamespace: "submitted"});

        var element20 = new volumedetailview({
            "id": "element20",
            "managerid": "search20",
            "el": $('#summary')
        }, {tokens: true, tokenNamespace: "submitted"}).render();

    });

    
});
