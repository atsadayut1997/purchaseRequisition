/*
Datepicker Thai for Handsontable
Using editor: 'datepicker-thai' by add to column configuration options in json

Example:

{
    "columns" : [
        {
            data: 'datepicker_th_spreadsheet',
            type: 'date', 
            editor: 'datepicker-thai'
        }
    ]
}
*/
(function(Handsontable){
  
    const DateTimeEditor = Handsontable.editors.BaseEditor.prototype.extend();

  DateTimeEditor.prototype.init = function() {
    this.dateTime = document.createElement('input');
    this.dateTime.setAttribute('type', 'text');

    const that = this;
    this.dateTimeInput = $(this.dateTime).datepicker({
        autoclose: true,
        language: "th-th"
    }).on('changeDate', function(ev){
        var newDate = new Date(ev.date);
        var dateStr = newDate.getDate();
        var monthStr = parseInt(newDate.getMonth()) + 1;
        var yearStr = parseInt(newDate.getFullYear()) + 543;
        if (parseInt(dateStr) < 10) {
          dateStr = '0' + dateStr;
        }
        
        if (parseInt(monthStr) < 10) {
          monthStr = '0' + monthStr;
        }
        //Can change date format here
        that.instance.setDataAtCell(that.row, that.col, dateStr+"/"+monthStr+"/"+yearStr);
    });
  };

  DateTimeEditor.prototype.open = function () {
    if(this.dateTimeInput.isOpen) return;

    this.dateTimeInput.datepicker('place');
    this.dateTimeInput.datepicker('update');
    this.dateTimeInput.datepicker('show');

    let rect = this.TD.getBoundingClientRect();
    let offsetLeft = rect.left + window.pageXOffset || document.documentElement.scrollLeft;
    let offsetTop = rect.top + window.pageYOffset || document.documentElement.scrollTop;
    offsetTop += this.TD.offsetHeight;

    let pop = document.querySelector('div.datepicker');
    pop.style.top = offsetTop + "px";
    pop.style.left = offsetLeft + "px";

    event.stopPropagation();
  };
  
    DateTimeEditor.prototype.close = function () {};
  
    DateTimeEditor.prototype.getValue = function(){
      return this.dateTime.value ;
    };
  
    DateTimeEditor.prototype.setValue = function(newValue){
      this.dateTime.value = newValue;
    };
  
    DateTimeEditor.prototype.focus = function () {};
  
    Handsontable.editors.DateTimeEditor = DateTimeEditor;
    Handsontable.editors.registerEditor('datepicker-thai', DateTimeEditor);
  }(Handsontable));