function initMap() {
  google.maps.visualRefresh = true;

  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(41.8874453131747, -87.6244597172855),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  layerA = new google.maps.FusionTablesLayer({
    map: map,
    heatmap: {enabled: false},
    query: {
      select: "col2",
      from: "1uZhN8wZRO6YTxYberuLRX-f4mkMe2rGiqGahvOcl",
      where: ""
    },
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  layerB = new google.maps.FusionTablesLayer({
    map: map,
    heatmap: {enabled: false},
    query: {
      select: "col0",
      from: "1udss4U_rwl-_4hNAF7Ig2LzCjNu8zxwZnroK1R2g",
      where: ""
    },
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  layerC = new google.maps.FusionTablesLayer({
    map: map,
    heatmap: { enabled: false },
    query: {
      select: "col0",
      from: "11LsnMLQzjk1WJ-yW1j8L7j-VSO0Gy7kWL5VzMXTu",
      where: ""
    },
    options: {
      styleId: 2,
      templateId: 2
    }
  });

  var layers = {
    a: layerA,
    b: layerB,
    c: layerC,
  }

  $(function(){
    $('.js-toggle').on('click', function() {

      var layer = layers[$(this).attr('link')];

      if (layer.getMap() === null) {
        layer.setMap(map);
      } else {
        layer.setMap(null);
      }
    })
  })

}
