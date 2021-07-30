const http = require('http')
const EventEmitter = require('events').EventEmitter

window.exports = {
    'chp': {
        mode: 'list',
        args: {
            enter: (action, callbackSetList) => {
                var show = []
                var eventHandler = new EventEmitter
                var count = 5
                eventHandler.on('after', function () {
                    count--;
                    console.log(count)
                    if (!count)
                        this.emit('complete');
                });
                eventHandler.on('complete', function () {
                    callbackSetList(show)
                });
                //node网络请求可真难弄
                for (let i = 0; i < 5; i++) {
                    http.get("http://101.34.15.241/api", (res) => {
                        let temp = ""
                        res.on("data", (data) => {
                            temp += data
                        })
                        res.on("end", () => {
                            show.push({description: JSON.parse(temp).data})
                            eventHandler.emit('after')
                        })
                        req.on('error', error => {
                            eventHandler.emit('after')
                        })
                    });
                }

            },
            select: (action, itemData) => {
                utools.copyText(itemData.description)
                window.utools.hideMainWindow()
            }
        }
    }

}
