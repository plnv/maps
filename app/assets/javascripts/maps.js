function initMap() {
  google.maps.visualRefresh = true;

  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center: new google.maps.LatLng(41.8874453131747, -87.6244597172855),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var key = 'AIzaSyC_Ek1yaUgPesLSbwglvjZ_TV0K-krf25E';
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


  for (var l in layers) {
    var item = layers[l];
    item.layer = new google.maps.FusionTablesLayer({
      map: map,
      heatmap: {enabled: false},
      query: {
        select: item.select,
        from: item.id,
        where: ""
      },
      options: {
        styleId: 2,
        templateId: 2
      }
    });


    $(function () {
      var layer = item.layer;
      var link = item.link;


      $('.js-toggle[link=' + link + ']').on('click', function () {
        if (layer.getMap() === null) {
          layer.setMap(map);
        } else {
          layer.setMap(null);
        }
      });


      var sql = "SELECT COUNT() FROM " + item.id;
      var url = 'https://www.googleapis.com/fusiontables/v2/query?uploadType=media&alt=json&key=' + encodeURIComponent(key) + '&sql=' + encodeURIComponent(sql) + '&callback=?';
      $.getJSON(url, function (data) {
        console.log(data)
        if (data.error) {
          alert(data.error.message);
          return;
        }
        $('.js-toggle[link=' + link + ']').parent().find(".qvan").text('(' + data.rows[0] + ')')
      });


    })

  }
}

