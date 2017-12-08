class AjaxHandler {
    get(url, callback, extras) {
        $.ajax({
            url: url,
            dataType: 'json',
            type: 'GET',
            data: extras,
            contentType:'application/json',
            success: function(response) {
                if (callback) {
                    callback(response);
                }
            }
        });
  }

  post(url, data, callback) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify(data),
        contentType:'application/json',
        success: function(response) {
            if (callback) {
                callback(response);
            }
        }
    });
  }

  put(url, data, callback) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'PUT',
        data: JSON.stringify(data),
        contentType:'application/json',
        success: function(response) {
            if (callback) {
                callback(response);
            }
        }
    });
  }

  delete(url, callback) {
     $.ajax({
        url: url,
        dataType: 'json',
        type: 'DELETE',
        contentType:'application/json',
        success: function(response) {
            if (callback) {
                callback(response);
            }
        }
    });
  }
}

export default new AjaxHandler();