$(document).ready(function () {

/**
 * Declare global variable _people to hold access data and populate
 * with information for 5 example users.
 */
  var _people = {};

  _people.chantell = new Person("1489", "17305", "9xapJucRnQ5LUWrQE7qEqtx8jgqyvHXD","jPssYUMVVNaLaYPIbY7P9ESGzdksCOlf", "field_ds_personal_details");
  _people.elroy = new Person("1490", "17305", "ddVUQ5v8X9BL3H27WlZqScGxgGsiWsoe","jPssYUMVVNaLaYPIbY7P9ESGzdksCOlf", "field_ds_personal_details");
  _people.laquita = new Person("1491", "17305", "hudrHay5mhhJmBrEkKlSOSNUMXc4YXI0","jPssYUMVVNaLaYPIbY7P9ESGzdksCOlf", "field_ds_personal_details");
  _people.mi = new Person("1492", "17305", "cRlEDBn32we61GTLyuxkXOr4hfSN6tzW","jPssYUMVVNaLaYPIbY7P9ESGzdksCOlf", "field_ds_personal_details");
  _people.edward = new Person("1494", "17305", "Hh1QqUEYxSJxuFcy5YkjJmtTmWWcxfHY","jPssYUMVVNaLaYPIbY7P9ESGzdksCOlf", "field_ds_personal_details");

/**
 * On click of buttons of class "person", populate input fields with 
 * relevant data from _people.
 */
  $(".person").click(function () {

    var selected = $(this).attr("id");

    $("input[name=uid]").val(_people[selected].uid);
    $("input[name=cid]").val(_people[selected].cid);
    $("input[name=pds_key]").val(_people[selected].pds_key);
    $("input[name=api_key]").val(_people[selected].api_key);
    $("input[name=data_set]").val(_people[selected].data_set);

  });

/**
 * On click of "new person" button, clear all input fields and table,
 * and hide error, Url and Ajax boxes.
 */
  $("#new-person-button").click(function () {

    $(".field").val("");
    $("#table-data").html("");
    $("#table-container").hide();
    $("#code-box").hide();
    $("#call-box").hide();
    $("#error-alert").hide();

  });

/**
 * On click of data set dropdown selecton, populate "data set" input box
 * with selected option.
 */
  $(".dataset").click(function () {

    var option = $(this).attr("id");

    $("input[name=data_set]").val(option);

  });

/**
 * On click of get data button, set variables for inputs, make 
 * the ajax call and handle the response.
 */
  $("#get-data-button").click(function () {

    $("#table-data").html(""); // Clears table data

    // Creates variables for each of the input groups
    var uid = $("input[name=uid]").val();
    var cid = $("input[name=cid]").val();
    var pds_key = $("input[name=pds_key]").val();
    var api_key = $("input[name=api_key]").val();
    var data_set = $("input[name=data_set]").val();
    var conid = uid + "-" + cid;

    // Creates variables for URL and Ajax strings
    var url = "https://sbx-api.mydex.org/api/pds/pds/" + uid + ".jsonp?key=" + pds_key + "&api_key=" + api_key + "&con_id=" + conid + "&source_type=connection&dataset=" + data_set;
    var ajax = "\n\t$.ajax({\n\t\turl:\"" + url + "\",\n\t\tdataType:\"jsonp\",\n\t\tcrossDomain:true,\n\t" + "}).done(function(response) { \n\t\t// Remember to change this in your code!!\n\t\t// Handle response\n\t});";

    // Checks if the uid field has been left empty.
    if (uid == "") {

      // Shows error, hides the table and URL and Ajax boxes.
      $("#error-alert").html("<span class='glyphicon glyphicon-exclamation-sign'></span><strong> Whoops!</strong> Make sure you input a UID or choose from the presets at the top!")
      $("#error-alert").show("fast");
      $("#code-box").hide();
      $("#call-box").hide();
      $("#table-container").hide();
    }
    else {

      // Hides the error box
      $("#error-alert").hide();

      /**
       * Makes an ajax get request to the specified url. A successful call 
       * returns a JSONP object. This is done to allow the transfer of
       * JSON data across domains.
       */
      $.ajax({

        url: url,
        dataType: "jsonp",
        crossDomain: true

      }).done(function (response) {
        /**
         * The code below is executed when the ajax call is finished.
         * It unpacks the returned JSONP object, checks the content and 
         * displays either the error in the data box or the returned data
         * in the table and the associated URL and example Ajax call.
         */

        // Checks for error response and display. Hides other elements.
        if (response.hasOwnProperty("error")) {
          $("#error-alert").html("<span class='glyphicon glyphicon-exclamation-sign'></span><strong> Whoops!</strong> " + response.error);
          $("#error-alert").show("fast");
          $("#code-box").hide();
          $("#call-box").hide();
          $("#table-container").hide();
        }
        else {
          // Unpacks recieved JSON object and displays in the table.
          var received_data = response[data_set];
          var fields = received_data.instance_0;
          for (var field in fields) {
            var temp = fields[field];
            var field_cleaned = string_cleaner(field);
            $("#table-data").append("<tr><td>" + field_cleaned + " </td><td>"
              + temp.value + "</td></tr>");
            $("#table-container").show();
          }

          // Displays URL and Ajax strings.
          $("#code-box").html("Url: \t" + url);
          $("#code-box").show();
          $("#call-box").html("Ajax call:" + ajax);
          $("#call-box").show();
        }
      });
    }
  });

/**
 * Cleans up the strings that describe mydex field names.
 *
 * @param string
 *   String describing the field names returned from mydex. For example,
 *   field_personal_fname. Note: This string always has the format 
 *   field_dataset_XXXXX.
 *
 * @return
 *   The string in the correct format.
 */
  function string_cleaner(string) {

    string = (string.substring((string.search("_")+1),string.length));
    string = (string.substring((string.search("_")+1),string.length));
    string = string.replace("_"," ");
    var tempstr1 = string.substring(0,1);
    tempstr1 = tempstr1.toUpperCase();
    var tempstr2 = string.substring(1,string.length);
    string = tempstr1 + tempstr2;
    return(string);
  }

/**
 * Constructor for the person objects. Takes parameters for uid, cid
 * PDS key, API key and dataset and creates a new person object with
 * a propety for each. 
 *  
 * @param uid
 *   The user id to be associated with the constructed person.
 * @param cid
 *   The connection id to be associated with the constructed person.
 * @param pds_key
 *   The PDS Key to be associated with the constructed person.
 * @param api_key
 *   The API Key to be associated with the constructed person.
 * @param data_set
 *   The data set to be associated with the constructed person.
 */
  function Person(uid,cid,pds_key,api_key,data_set) {

    this.uid = uid;
    this.cid = cid;
    this.pds_key = pds_key;
    this.api_key = api_key;
    this.data_set = data_set;
  }
});
