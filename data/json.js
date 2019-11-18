//本地模拟首页json数据
var json = {
    "buildings": [
                  {
                  "name":"1幢",
                  "units": [
                           {"uName":"1单元",
                             "id":"1",
                              "status":"在线" 
                           },
                           {"uName":"2单元",
                            "id":"2",
                            "status":"在线"  
                            },
                            {"uName":"3单元",
                             "id":"1",
                              "status":"离线"  },
                              {"uName":"4单元",
                             "id":"1",
                              "status":"离线"  }
                            ]
                  },
                {
                  "name":"2幢",
                  "units": [
                           {"uName":"1单元",
                             "id":"1",
                              "status":"在线"  },
                           {"uName":"2单元",
                             "id":"2",
                              "status":"在线"  },
                            {"uName":"3单元",
                             "id":"1",
                              "status":"离线"  }
                            ]
                  },
                {
                  "name":"2幢",
                  "units": [
                           {"uName":"1单元",
                             "id":"1",
                              "status":"在线"  },
                           {"uName":"2单元",
                             "id":"2",
                              "status":"在线"  
                           },
                            {"uName":"3单元",
                             "id":"1",
                              "status":"离线" 
                            },
                            {"uName":"4单元",
                             "id":"1",
                              "status":"离线" 
                            },
                            {"uName":"5单元",
                             "id":"1",
                              "status":"离线" 
                            }
                            ]
                  }
]};

module.exports = {
	dataList:json
}
