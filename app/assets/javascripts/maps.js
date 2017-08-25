var key = 'AIzaSyC_Ek1yaUgPesLSbwglvjZ_TV0K-krf25E';

function queryArea(item, rect) {
  var sql = 'SELECT COUNT() FROM ' + item.id + ' WHERE ST_INTERSECTS(' + item.select + ', RECTANGLE(LATLNG(' + rect.left + '), LATLNG(' + rect.right + ')))';
  var url = 'https://www.googleapis.com/fusiontables/v2/query?uploadType=media&alt=json&key=' + encodeURIComponent(key) + '&sql=' + encodeURIComponent(sql) + '&callback=?';
  $.getJSON(url, function (data) {
    console.log(data);
    if (data.error) {
      //alert(data.error.message);
      return;
    }
    var val =  (data.rows && data.rows[0]) ? (data.rows[0] + '/') : '';
    $('div[link=' + item.link + ']').find('.now').text(val);
  });
}

function queryTotal(item) {
  var sql = 'SELECT COUNT() FROM ' + item.id;
  var url = 'https://www.googleapis.com/fusiontables/v2/query?uploadType=media&alt=json&key=' + encodeURIComponent(key) + '&sql=' + encodeURIComponent(sql) + '&callback=?';
  $.getJSON(url, function (data) {
    console.log(data);
    if (data.error) {
      // alert(data.error.message);
      return;
    }
    $('div[link=' + item.link + ']').find('.total').text(data.rows[0]);
  });
}

function getLayer(map, item) {
  return new google.maps.FusionTablesLayer({
    map: map,
    heatmap: {enabled: false},
    query: {
      select: item.select,
      from: item.id,
      where: ''
    },
    options: {
      styleId: 2,
      templateId: 2
    }
  });
}

function getRectangel(map) {
  var bounds = map.getBounds();

  var SW = bounds.getSouthWest();
  var left = SW.lat() + ',' + SW.lng();

  var NE = bounds.getNorthEast();
  var right = NE.lat() + ',' + NE.lng();

  return {left: left, right: right};
}

function initMap() {
  google.maps.visualRefresh = true;

  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(41.8874453131747, -87.6244597172855),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var layers = [
    {
      id: '1uZhN8wZRO6YTxYberuLRX-f4mkMe2rGiqGahvOcl',
      select: 'col2',
      layer: null,
      link: 'a'
    },
    {
      id: '1udss4U_rwl-_4hNAF7Ig2LzCjNu8zxwZnroK1R2g',
      select: 'col0',
      layer: null,
      link: 'b'
    },
    {
      id: '11LsnMLQzjk1WJ-yW1j8L7j-VSO0Gy7kWL5VzMXTu',
      select: 'col0',
      layer: null,
      link: 'c'
    }

  ];

  function queryAreaAll() {
    for (var l in layers) {
      var item = layers[l];
      var rect = getRectangel(map);
      queryArea(item, rect);
    }
  }

  map.addListener('dragend', queryAreaAll);
  map.addListener('zoom_changed', queryAreaAll);
  setTimeout(queryAreaAll, 1000);

  for (var l in layers) {
    var item = layers[l];
    item.layer = getLayer(map, item);

    $(function () {
      var layer = item.layer;
      var link = item.link;

      $('div[link=' + link + '] .js-toggle').on('click', function () {
        if (layer.getMap() === null) {
          layer.setMap(map);
        } else {
          layer.setMap(null);
        }
      });

      queryTotal(item);

    });

  }



}

