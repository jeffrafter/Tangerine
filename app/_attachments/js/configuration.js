var configuration = {
   "_id" : "configuration",

  "local" : {
    "dbName" : "group-sweetgroup",
    "login"  : "admin:luvcouch",
    "host"   : "http://localhost:5984"
  },
  "import" : {
    "couchappUrl": "http://localhost:5984/group-sweetgroup/_design/ojai/index.html"
  },
   "update" : {
      "target" : "http://admin:luvcouch@localhost:5984/tangerine",
      "dbName" : "update",
      "host"   : "ugandagaap.iriscouch.com",
      "login"  : ""
   },

   "subnet" : {
      "base" : "192.168.1."
   },

   "trunk" : {
      "dbName" : "tangerine",
      "host" : "ugandagaap.iriscouch.com"
   },

   "groupDBPrefix" : "group-",
   "port" : 5984,

   "tree"    : "http://tree.tangerinecentral.org/",
   "robbert" : "http://robbert.tangerinecentral.org/",

   "defaults" : {
      "settings" : {
         "context" : "mobile",
         "groupDDoc" : "ojai",
         "language" : "en",
         "log" : [""],
         "groupName" : "sweetgroup",
         "groupHost" : "http://localhost:5984",
         "upPass" : "pass"
      }
   },
   "reports" : [
      {
         "reportType" : "progress",
         "name" : "progress graph",
         "menuView" : "ProgressMenuView"
      },
      {
         "reportType" : "mastery",
         "name" : "mastery check table",
         "menuView" : "MasteryCheckMenuView"
      },
      {
         "name" : "class grouping table",
         "menuView" : "KlassGroupingMenuView"
      },
      {
         "name" : "csv",
         "menuView" : "CsvMenuView",
         "context" : "server"
      }
   ],

   "prototypeViews" : {
      "grid" : {
         "run" : "GridRunView",
         "edit" : "GridEditView"
      },
      "location" : {
         "run" : "LocationRunView",
         "edit" : "LocationEditView"
      },
      "datetime" : {
         "run" : "DatetimeRunView",
         "edit" : "DatetimeEditView"
      },
      "observation" : {
         "run" : "ObservationRunView",
         "edit" : "ObservationEditView"
      },
      "survey" : {
         "run" : "SurveyRunView",
         "edit" : "SurveyEditView"
      },
      "gps" : {
         "run" : "GpsRunView",
         "edit" : "GpsEditView"
      },
      "id" : {
         "run" : "IdRunView",
         "edit" : "IdEditView"
      },
      "consent" : {
         "run" : "ConsentRunView",
         "edit" : "ConsentEditView"
      }
   },

   "printFormats" : [
      {
         "name" : "Content",
         "key" : "content"
      },
      {
         "name" : "Stimuli",
         "key" : "stimuli"
      },
      {
         "name" : "Backup",
         "key" : "backup"
      },
      {
         "name" : "Metadata",
         "key" : "metadata"
      }
   ],

   "collection" : "config"

}
