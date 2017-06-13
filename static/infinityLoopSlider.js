function genCharArray(charA, charZ) {
  var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

var duration = 3000;
var alphabetList = genCharArray('a', 'z');

function animate(item) {
  var setSibling = false;
  item.text(alphabetList[item.attr("id")]);
  item.animate({
      "left": "-=300px",
    }, {
      duration: duration,
      easing: "linear",
      step: function(now, fx) {
        if ((now <= 225) && !setSibling) {
          var newItem = item.clone();
          newItem.css('left', "300px");
          var itemId = parseInt(item.attr("id")) + 1;
          itemId = (itemId > 25) ? itemId - 26 : itemId;
          newItem.attr('id', itemId);
          newItem.text(alphabetList[newItem.attr("id")]);
          item.after(newItem);
          animate(newItem);
          setSibling = true;
        }
      },
      complete: function() {
        item.remove();
      },
    });
}
      
animate($(".target"));

$(document).keypress(function(event) {
  if (String.fromCharCode(event.keyCode) == 'r') {
    $("#result").text('');
  } else if (event.keyCode == 13) {
    var itemList = $(".target").find().prevObject;
    var leftInfoList = [];
    for (var i = 0; i < itemList.length; i++) {
      var item = {
        'left': itemList[i].style.left.split("px")[0],
        'id': itemList[i].id
      };
      leftInfoList.push(item);
    }
    var selected = '';
    for (var j = 0; j < leftInfoList.length; j++) {
      if (Math.abs(leftInfoList[j].left - 150) < 60) {
        selected = alphabetList[leftInfoList[j].id];
      }
    }
    $("#result").text($("#result").text() + selected);
  }
});
