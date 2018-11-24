// const txtRow = document.getElementById('txtRow');
// const txtColumn = document.getElementById('txtColumn');
// const txtValue = document.getElementById('txtValue');
// const btnGet = document.getElementById('btnGet');
// const btnSet = document.getElementById('btnSet');

// const data = [
// {itemID:1,purch:null,vendor:42,reserve:null,sPrice:null,preBid:null,desc:"projectors fridge",lotNum:1},
// {itemID:2,purch:null,vendor:381,reserve:40.09,sPrice:136.55,preBid:0.53,desc:"one bobby",lotNum:2},
// {itemID:3,purch:null,vendor:256,reserve:null,sPrice:null,preBid:null,desc:"complaints tea",lotNum:3},
// {itemID:4,purch:null,vendor:733,reserve:null,sPrice:103.67,preBid:1.66,desc:"solely cindy",lotNum:4},
// {itemID:5,purch:156,vendor:911,reserve:22.03,sPrice:129.87,preBid:3.13,desc:"committed compensation",lotNum:5},
// {itemID:6,purch:767,vendor:501,reserve:11.7,sPrice:null,preBid:11.46,desc:"reviewed it",lotNum:6},
// {itemID:7,purch:null,vendor:799,reserve:null,sPrice:74.69,preBid:3.62,desc:"hc out",lotNum:7},
// {itemID:8,purch:null,vendor:787,reserve:21.54,sPrice:null,preBid:14.72,desc:"pci liquid",lotNum:8},
// {itemID:9,purch:null,vendor:340,reserve:null,sPrice:24.02,preBid:16.54,desc:"refine brunswick",lotNum:9},
// {itemID:10,purch:null,vendor:90,reserve:null,sPrice:74.44,preBid:13.63,desc:"anxiety jazz",lotNum:10}
// ];

// const hot = new Handsontable(container, {
//   data: data,
//   dataSchema: {itemID:null,purch:null,vendor:null,reserve:null,sPrice:null,preBid:null,desc:null,lotNum:null},
//   //startRows: 0,
//   startCols: 8,
//   rowHeaders: true,
//   colHeaders: ['ItemID', 'Purchaser', 'Vendor', 'Reserve', 'Sale Price', 'Pre-Bids', 'Description', 'Lot Number'],
//   columns: [
//     {data: 'itemID', editor: 'numeric', readOnly: true, validator: 'numeric'},
//     {data: 'purch', editor: 'numeric', validator: 'numeric'},
//     {data: 'vendor', editor: 'numeric', validator: 'numeric'},
//     {data: 'reserve', editor: 'numeric', validator: 'numeric'},
//     {data: 'sPrice', editor: 'numeric', validator: 'numeric'},
//     {data: 'preBid', editor: 'numeric', validator: 'numeric'},
//     {data: 'desc', editor: 'text'},
//     {data: 'lotNum', editor: 'numeric', validator: 'numeric'}
//   ],
//   columnSorting: true,
//   minSpareRows: 0,
//   manualColumnResize: true,
//   manualRowMove: true
// });

// function get(){
//   txtValue.value = hot.getDataAtCell(parseInt(txtRow.value), parseInt(txtColumn.value));
// }
//
// function set(){
//   hot.setDataAtCell(parseInt(txtRow.value), parseInt(txtColumn.value), txtValue.value, "");
// }

//"prop" is the name given to functions which utilize the field headings instead of using the column number, this will be very useful!
