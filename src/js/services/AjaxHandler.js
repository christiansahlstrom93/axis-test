class AjaxHandler {
    get(url, callback, extras) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            data: extras,
            contentType:'application/json',
            success: function(response) {
                callback(response);
            }
        });
  }
}

export default new AjaxHandler();