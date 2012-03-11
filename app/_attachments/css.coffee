###
This appraoch allows colors to be stored as constants
###

blue = "#5E87B0"
yellow = "#F7C942"
orange = "#f2672c"
orangerind= "#f6e97f"
first_click_color = yellow
second_click_color = blue
red = "red"

$("head").append "
  <style>

    body{
      font-size: 150%;
    }

    body.flash{
      background-color: #{yellow};
    }

    #navigation{
      margin-bottom: 20px;
      background-color: #{yellow};
    }

    #navigation{
      font-size:50%;
    }

    button{
      margin: 10px;
    }

    #version {
      position: absolute;
      top: 10px;
      right: 10px;
    }
    #content{
      padding: 5px;
    }
    #assessments td{
      list-style: none;
      text-decoration:none;
      font-family:Arial, sans-serif;
      font-weight:bold;
      font-size: 200%;
      padding:3px 5px;
      border:1px solid #aaa;
      border-radius:3px;
      cursor:pointer;
    }

    legend{
      font-weight: bold;
    }

    fieldset fieldset legend{
      font-weight: normal;
    }

    label{
      display: block;
    }

    fieldset{
      border-width: 1px;
      border-style: solid;
      margin: 5px;
      padding: 5px;
    }

    fieldset[data-type=horizontal] label{
      display: inline;
    }

    fieldset[data-type=horizontal] input{
      margin-right:20px;
    }

    .controls.flash{
      color: black;
      background-color: #{red};
    }

    .flash {
      color: #{red};
    }

    .toggle-grid-with-timer td.flash {
      border-color: #{red};
    }

    button.timer-button{
      height:100px;
      width:100px;
    }

    .timer-seconds{
      font-size:200%;
    }


    #InitialSound .ui-controlgroup-label{
      font-size: x-large;
    }

    #Phonemes legend{
      font-size: x-large;
    }

    .grid{
      float: left;
      text-align: center;
      width: 70px;
      height: 70px;
      margin: 5px;
      border: 3px outset gray;
      background-color: lightgray;
      color: lightgray;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
    }

    .grid.columns-5{
      width: 150px;
    }


    .grid.show{
      color: black;
    }

    .grid span{
      font-size: 50px;
      vertical-align: middle;
    }

    .grid.selected{
      text-decoration: line-through;
      color: white;
      background-color: #{blue};
    }
    .grid.last-attempted{
      color: red;
      border-right-color: red;
      border-top-color: red;
      border-bottom-color: red;
      border-style: solid;
    }
    .grid-text{
      white-space: nowrap;
    }

    @media screen and (orientation:landscape) {
      .toggle-row-portrait{
        display: none;
      }
    }

    .grid-row{
      display: block;
    }

    .toggle-row{
      background-color: #{blue};
      width: 30px;
      height: 30px;
      margin-top: 22px;
    }

    /* Next button size */
    div.ui-footer .ui-btn{
      font-size: 20px;
    }

    .disabled{
      color:gray;
    }

    .student-dialog{
      background-color: #C2C2C2;
      font-weight:bold;
      border: 1px;
      border-style: solid;
    }

    .student-dialog-nonverbal{
      font-weight: normal;
      font-style: italic;
    }

    .ui-icon-triangle-1-e{
      margin-left: 10px;
      padding: 0px 0px 0px 20px;
      background: url(images/spindown-closed.gif) no-repeat left;
    }

    .ui-icon-triangle-1-s{
      margin-left: 10px;
      padding: 0px 0px 0px 20px;
      background: url(images/spindown-open.gif) no-repeat left;
    }

    a{
      -webkit-appearance: button;
      -webkit-box-align: center;
      background-color: #DDD;
      border-bottom-color: #DDD;
      border-bottom-style: outset;
      border-bottom-width: 2px;
      border-left-color: #DDD;
      border-left-style: outset;
      border-left-width: 2px;
      border-right-color: #DDD;
      border-right-style: outset;
      border-right-width: 2px;
      border-top-color: #DDD;
      border-top-style: outset;
      border-top-width: 2px;
      box-sizing: border-box;
      color: #222;
      cursor: pointer;
      display: inline-block;
      font-family: sans-serif;
      font-size: 24px;
      height: 34px;
      letter-spacing: normal;
      line-height: normal;
      margin-bottom: 10px;
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 10px;
      overflow-y: visible;
      padding-bottom: 1px;
      padding-left: 6px;
      padding-right: 6px;
      padding-top: 1px;
      vertical-align: baseline;
      text-decoration:none;
    }
      a:visited { 
        text-decoration:none;
        color: #222;
      }


      a:hover { 
        border-color: #ccc; 
        color: #222;
      }

      .message{
        color: #{orangerind};
        background-color: #{orange};
        position: absolute;
        right: 100px;
        top: 100px;
      }
      .error{
        color: #{orangerind};
        background-color: #{orange};
      }

    form#subtestEdit textarea{
      width: 500px;
      height:200px;
    }

    table#manage-assessments{
      border: solid 1px;
    }
    table#manage-assessments tr{
      border: solid 1px;
    }
    table#manage-assessments td{
      vertical-align: middle;
    }
    label[for='edit-archive']{
      display:inline;
    }

  </style>
  "
