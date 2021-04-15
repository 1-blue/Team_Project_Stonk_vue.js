function fetchItems() {
  return new Promise(function(resolve, reject) {
    var items = [1,2,3];
    resolve(items)
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems);
  console.log("x");
  console.log("y");
  console.log("z");
  return "success";
}

async function test() {
  var resultItems = await logItems();
  console.log(resultItems);
  console.log("x1");
  console.log("y1");
  console.log("z1");
}

test();