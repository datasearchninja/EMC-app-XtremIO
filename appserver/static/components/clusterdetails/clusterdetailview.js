define(function(require, exports, module) {
    // Load requirements
    var _ = require('underscore');
    var mvc = require('splunkjs/mvc');
    var SimpleSplunkView = require('splunkjs/mvc/simplesplunkview');
    var dtTotal;
    var cluster;
    var Cluster;
    
    // Define the custom view class
    var VmdetailsView = SimpleSplunkView.extend({
        className: "clusterdetailview",
       
        // Define our initial values, set the type of results to return
        options: {
            //Boolean - Whether we animate the rotation of the Doughnut
			//v_animateRotate : true,
			height : 100,
			width : 100,
            mychartid: "",   // ID for the chart
            data: "results" ,
	cluster_name: ""
 // Results type
        },
        

        // Override this method to configure the view
        createView: function() {
        	/*console.log("in createView");
            // Create a unique chart ID based on the tag's unique ID
            mychartid = this.name + "-clusterdetailview";
            this.$el.html('<div id="' + mychartid + '" width="' + this.settings.get('width') + '" height="' + this.settings.get('height') + '" class="doughnut-canvas"></div>');
*/          Cluster=this.settings.get('cluster_name') ; 
return this;
        },
		
		formatResults : function(resultsModel) {
			console.log("in formatResults");
			if (!resultsModel) { return []; }
			var data = resultsModel.data();
			console.log(data);
			return this.formatData(data);
		},
		// Override this method to format the data for the donut chart
        formatData: function(dataSet) {	
			var data = dataSet['rows'];
			console.log(dataSet['fields']);
			console.log(data);
			return dataSet;
		},
		
		// Override this method to put the Splunk data into the view
        updateView: function(viz, cluster) {
            if(JSON.stringify(cluster) === dtTotal) {
               return ;
            }
            
            dtTotal = JSON.stringify(cluster);
            
        	console.log("in updateView");
            var prepareTable = "";
			var threshold_value = "";
			var critical = '<span class="icon-alert-circle critical"></span>';
			var warning = '<span class="icon-alert-circle warning"></span>';
			var normal = '<span class="icon-alert-circle normal"></span>';
			var vmcheck = false;
			
            _.each(cluster['rows'], function(row, i){
                for (var j = 0; j < cluster['fields'].length; j++) {
                    var fld_name = cluster['fields'][j];
					
                    var fld_value = row[j];
                    if (fld_value==null){
                        fld_value="";
						
                    }
                 
		    
		    
                    

                    else
		{
		prepareTable = prepareTable + "<span class='detail_view_label'>" + fld_name + "</span> : <span class='detail_view_value'>" + fld_value + "</span><br/><br/>";    
                    }
                };
            });
            console.log(prepareTable);
            this.$el.html( prepareTable);
        
		}
	});
	
	return VmdetailsView;
});
