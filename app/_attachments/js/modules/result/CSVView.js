var CSVView,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

CSVView = (function(_super) {

  __extends(CSVView, _super);

  function CSVView() {
    CSVView.__super__.constructor.apply(this, arguments);
  }

  CSVView.prototype.events = {
    'click .option_reduce': 'toggleReduce'
  };

  CSVView.prototype.toggleReduce = function(event) {
    var value;
    value = $(event.target).val();
    this.reduceExclusive = value === "true" ? true : false;
    return this.initialize({
      assessmentId: this.assessmentId
    });
  };

  CSVView.prototype.initialize = function(options) {
    var allResults,
      _this = this;
    this.reduceExclusive = options.reduceExclusive;
    this.assessmentId = Utils.cleanURL(options.assessmentId);
    this.malawi2012EGRA = false;
    if (this.assessmentId === "b6faf1dcbe0aac8e66fc4607aa2c348b") {
      this.reduceExclusive = true;
      this.malawi2012EGRA = true;
      console.log("Malawi 2012 May EGRA");
      this.replaceMapValues = {
        "1": ["yes", "true", "TRUE", "True", "correct", "checked", "mkazi"],
        "0": ["no", "false", "FALSE", "False", "incorrect", "unchecked", "mwamuna"],
        ".": ["missing", "na", "Na", "NA", "undefined", "not_asked", "no_response", "skip"]
      };
      this.replaceMapKeys = {
        "enumerator": "admin_name",
        "starttime": "start_time",
        "endtime": "end_time",
        "date-and-time:year": "year",
        "date-and-time:month": "month",
        "date-and-time:day": "day",
        "date-and-time:time": "assess_time",
        "school:province": "region",
        "school:district": "district",
        "school:name": "school",
        "school:school-id": "school_code",
        "student-consent:participant-consents": "consent",
        "student-information:school-shift": "shift",
        "student-information:zaka-zakubadwa": "age",
        "student-information:mkazi": "gender",
        "letter-name:autostopped": "letter_auto_stop",
        "letter-name:last-attempted": "letter_attempted",
        "letter-name:time-remaining": "letter_time_remain",
        "letter-name:time-elapsed": "NOT USED - time_elapsed",
        "syllables:autostopped": "syllable_sound_auto_stop",
        "syllables:last-attempted": "syllable_sound_attempted",
        "syllables:time-remaining": "syllable_sound_time_remain",
        "syllables:time-elapsed": "NOT USED - time_elapsed",
        "invented-words:autostopped": "invent_word_auto_stop",
        "invented-words:last-attempted": "invent_word_attempted",
        "invented-words:time-remaining": "invent_word_time_remain",
        "invented-words:time-elapsed": "NOT USED - time_elapsed",
        "oral-passage-reading:autostopped": "oral_read_auto_stop",
        "oral-passage-reading:last-attempted": "oral_read_attempted",
        "oral-passage-reading:time-remaining": "oral_read_time_remain",
        "oral-passage-reading:time-elapsed": "NOT USED - time_elapsed",
        "student-information:stream:stream": "section"
      };
      this.replaceWithNumbering = {
        "initial-sounds": "pa_init_sound",
        "letter-name:letters-results": "letter",
        "syllables:letters-results": "syllable_sound",
        "invented-words:letters-results": "invent_word",
        "oral-passage-reading:letters-results": "oral_read_word",
        "reading-comprehension:comp": "read_comp"
      };
      this.abnormalNamingTag = "pupil-context-interview";
      this.abnormalNamingReplacement = "exit_interview";
      this.alphabetLetters = ["", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
      this.betweenColonsIgnore = [":lang-spec", ":kodi-kunyumba-kwanu-kuli-zinthu-ngati-izi", ":16b"];
    }
    allResults = new Results;
    allResults.fetch({
      key: this.assessmentId,
      success: function(collection) {
        _this.results = collection.models;
        return _this.render();
      }
    });
    this.disallowedKeys = ["mark_record"];
    return this.metaKeys = ["enumerator", "starttime", "timestamp"];
  };

  CSVView.prototype.render = function() {
    var checkedString, count, d, exportValue, i, index, item, keys, label, maxIndex, maxLength, metaKey, observationData, observations, optionKey, optionValue, prototype, result, resultDataArray, row, subtest, subtestName, surveyValue, surveyVariable, tableHTML, values, variableName, _i, _j, _k, _l, _len, _len10, _len11, _len12, _len13, _len2, _len3, _len4, _len5, _len6, _len7, _len8, _len9, _m, _ref, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
    if ((this.results != null) && (this.results[0] != null)) {
      tableHTML = "";
      resultDataArray = [];
      keys = [];
      _ref = this.metaKeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        metaKey = _ref[_i];
        keys.push(metaKey);
      }
      maxIndex = 0;
      maxLength = 0;
      _ref2 = this.results;
      for (i = 0, _len2 = _ref2.length; i < _len2; i++) {
        subtest = _ref2[i];
        if (subtest.attributes.subtestData.length > maxLength) {
          maxIndex = i;
          maxLength = subtest.attributes.subtestData.length;
        }
      }
      _ref3 = this.results[maxIndex].attributes.subtestData;
      for (_j = 0, _len3 = _ref3.length; _j < _len3; _j++) {
        subtest = _ref3[_j];
        subtestName = subtest.name.toLowerCase().dasherize();
        prototype = subtest.prototype;
        if (prototype === "id") {
          keys.push("id");
        } else if (prototype === "datetime") {
          keys.push("year", "month", "date", "assess_time");
        } else if (prototype === "location") {
          _ref4 = subtest.data.labels;
          for (_k = 0, _len4 = _ref4.length; _k < _len4; _k++) {
            label = _ref4[_k];
            keys.push(label);
          }
        } else if (prototype === "consent") {
          keys.push("consent");
        } else if (prototype === "grid") {
          variableName = subtest.data.variable_name;
          keys.push("" + variableName + "_auto_stop", "" + variableName + "_time_remain", "" + variableName + "_attempted", "" + variableName + "_item_at_time", "" + variableName + "_time_intermediate_captured");
          _ref5 = subtest.data.items;
          for (i = 0, _len5 = _ref5.length; i < _len5; i++) {
            item = _ref5[i];
            keys.push("" + variableName + (i + 1));
          }
        } else if (prototype === "survey") {
          _ref6 = subtest.data;
          for (surveyVariable in _ref6) {
            surveyValue = _ref6[surveyVariable];
            if (_.isObject(surveyValue)) {
              for (optionKey in surveyValue) {
                optionValue = surveyValue[optionKey];
                keys.push("" + surveyVariable + "_" + optionKey);
              }
            } else {
              keys.push(surveyVariable);
            }
          }
        } else if (prototype === "observation") {
          _ref7 = subtest.data.surveys;
          for (i = 0, _len6 = _ref7.length; i < _len6; i++) {
            observations = _ref7[i];
            observationData = observations.data;
            for (surveyVariable in observationData) {
              surveyValue = observationData[surveyVariable];
              keys.push("" + surveyVariable + "_" + i);
            }
          }
        } else if (prototype === "complete") {
          keys.push("additional_comments", "end_time", "gps");
        }
      }
      resultDataArray.push(keys);
      _ref8 = this.results;
      for (d = 0, _len7 = _ref8.length; d < _len7; d++) {
        result = _ref8[d];
        values = [];
        _ref9 = this.metaKeys;
        for (_l = 0, _len8 = _ref9.length; _l < _len8; _l++) {
          metaKey = _ref9[_l];
          values.push(result.attributes[metaKey]);
        }
        _ref10 = result.attributes.subtestData;
        for (_m = 0, _len9 = _ref10.length; _m < _len9; _m++) {
          subtest = _ref10[_m];
          prototype = subtest.prototype;
          if (prototype === "id") {
            values[keys.indexOf("id")] = subtest.data.participant_id;
          } else if (prototype === "location") {
            _ref11 = subtest.data.labels;
            for (i = 0, _len10 = _ref11.length; i < _len10; i++) {
              label = _ref11[i];
              values[keys.indexOf(label)] = subtest.data.location[i];
            }
          } else if (prototype === "datetime") {
            values[keys.indexOf("year")] = subtest.data.year;
            values[keys.indexOf("month")] = ["", "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(subtest.data.month);
            values[keys.indexOf("date")] = subtest.data.day;
            values[keys.indexOf("assess_time")] = subtest.data.time;
          } else if (prototype === "consent") {
            values[keys.indexOf("consent")] = subtest.data.consent;
          } else if (prototype === "grid") {
            variableName = subtest.data.variable_name;
            values[keys.indexOf("" + variableName + "_auto_stop")] = subtest.data.auto_stop;
            values[keys.indexOf("" + variableName + "_time_remain")] = subtest.data.time_remain;
            values[keys.indexOf("" + variableName + "_attempted")] = subtest.data.attempted;
            values[keys.indexOf("" + variableName + "_item_at_time")] = subtest.data.item_at_time;
            values[keys.indexOf("" + variableName + "_time_intermediate_captured")] = subtest.data.time_intermediate_captured;
            _ref12 = subtest.data.items;
            for (i = 0, _len11 = _ref12.length; i < _len11; i++) {
              item = _ref12[i];
              if (item.itemResult === "correct") {
                exportValue = 1;
              } else if (item.itemResult === "incorrect") {
                exportValue = 0;
              } else if (item.itemResult === "missing") {
                exportValue = ".";
              }
              values[keys.indexOf("" + variableName + (i + 1))] = exportValue;
            }
          } else if (prototype === "survey") {
            _ref13 = subtest.data;
            for (surveyVariable in _ref13) {
              surveyValue = _ref13[surveyVariable];
              if (_.isObject(surveyValue)) {
                for (optionKey in surveyValue) {
                  optionValue = surveyValue[optionKey];
                  if (optionValue === "checked") {
                    exportValue = 1;
                  } else if (optionValue === "unchecked") {
                    exportValue = 0;
                  } else if (optionValue === "not_asked") {
                    exportValue = ".";
                  }
                  values[keys.indexOf("" + surveyVariable + "_" + optionKey)] = exportValue;
                }
              } else {
                exportValue = surveyValue === "not_asked" ? "." : surveyValue;
                values[keys.indexOf("" + surveyVariable)] = exportValue;
              }
            }
          } else if (prototype === "observation") {
            _ref14 = subtest.data.surveys;
            for (i = 0, _len12 = _ref14.length; i < _len12; i++) {
              observations = _ref14[i];
              observationData = observations.data;
              console.log(observationData);
              for (surveyVariable in observationData) {
                surveyValue = observationData[surveyVariable];
                values[keys.indexOf("" + surveyVariable + "_" + i)] = surveyValue;
              }
            }
          } else if (prototype === "complete") {
            values[keys.indexOf("additional_comments")] = subtest.data.comment;
            values[keys.indexOf("gps")] = JSON.stringify(subtest.data.gps);
            values[keys.indexOf("end_time")] = subtest.data.end_time;
          }
        }
        resultDataArray.push(values);
      }
      /*
      for rowNumber, row of resultDataArray
        
        # Begin Taylor's Edits for Malawi 2012 EGRA May
        if @malawi2012EGRA
          if rowNumber == "0"
            lastNumberedReplace = "**TRASHVALUE**"
            lastAbnormalReplace = "**TRASHVALUE**"
            index = 0
            letterIndex = 0
            for i, key of resultDataArray[0]
              if @replaceMapKeys[key]? # Is it a simple substitute?
                resultDataArray[0][i] = @replaceMapKeys[key]
                index = 0
              else # Or do we need to add numbering?
                for prefixTag, replacement of @replaceWithNumbering
                  if ~key.indexOf(prefixTag)
                    if lastNumberedReplace == prefixTag
                      index++
                    else
                      lastNumberedReplace = prefixTag
                      index = 1
                    resultDataArray[0][i] = replacement + index.toString()
                if ~key.indexOf(@abnormalNamingTag)
                  
                  if lastNumberedReplace != @abnormalNamingTag
                    index = 0
                    lastNumberedReplace = @abnormalNamingTag
                    
                  indexFirstColon = key.indexOf(":")
                  indexLastColon = key.lastIndexOf(":")
                  betweenColons = key.substring(indexFirstColon, indexLastColon)
                  if indexFirstColon == indexLastColon or ~@betweenColonsIgnore.indexOf(betweenColons)
                    index++
                    letterIndex = 0
                  else if betweenColons != lastAbnormalReplace
                    letterIndex = 1
                    index++
                    lastAbnormalReplace = betweenColons
                  else
                    letterIndex++
                    index++ if letterIndex == 1
                  resultDataArray[0][i] = @abnormalNamingReplacement + 
                    index.toString() + @alphabetLetters[letterIndex]
                  
                  
                  
          else
            for i, value of resultDataArray[rowNumber]
              for mapKey, mapValue of @replaceMapValues
                if _.isBoolean(value) # Handle values that pretend to be a boolean
                  value = value.toString()
                if ~mapValue.indexOf(value) # Can we convert it?
                  resultDataArray[rowNumber][i] = mapKey
        
        # End Taylor's Edits for Malawi 2012 EGRA May
        */;
      for (i = 0, _len13 = resultDataArray.length; i < _len13; i++) {
        row = resultDataArray[i];
        tableHTML += "<tr>";
        count = 0;
        for (index = 0, _ref15 = row.length - 1; 0 <= _ref15 ? index <= _ref15 : index >= _ref15; 0 <= _ref15 ? index++ : index--) {
          tableHTML += "<td>" + row[index] + "</td>";
          count++;
        }
        tableHTML += "</tr>";
      }
      tableHTML = "<table>" + tableHTML + "</table>";
      this.$el.html(tableHTML);
      this.csv = this.$el.table2CSV({
        delivery: "value"
      });
      checkedString = "checked='checked'";
      this.$el.html("        <div id='csv_view'>        <h1>Result CSV</h1>        <textarea>" + this.csv + "</textarea><br>        <a href='data:text/octet-stream;base64," + (Base64.encode(this.csv)) + "' download='" + this.assessmentId + ".csv'>Download file</a>        (Right click and click <i>Save Link As...</i>)        </div>        ");
    }
    return this.trigger("rendered");
  };

  return CSVView;

})(Backbone.View);
