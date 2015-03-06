#!/usr/bin/python
import web, subprocess
adbPath = '/opt/android-sdk/platform-tools/adb'
urls = (
        '/', 'index',
        '/click', 'click',
        '/swipe', 'swipe',
        '/keyevent', 'sendKeyEvent', 
        '/text', 'sendText',
)

class index:
    def GET(self):
        render = web.template.render('./')
        return render.index()

class click:
    def POST(self):
        x, y = web.input().x, web.input().y
        subprocess.call(["sudo", adbPath, "shell", "input", "tap", x, y])
        return u'ok'

class swipe:
    def POST(self):
        x1, y1, x2, y2 = web.input().x1, web.input().y1, web.input().x2, web.input().y2
        print 'sending'
        subprocess.call(["sudo", adbPath, "shell", "input", "swipe", x1, y1, x2, y2])
        print 'sent..'
        return u'ok'

class sendKeyEvent:
    def POST(self):
        key, longpress = web.input().key, web.input().longpress
        if longpress != "false":
            subprocess.call(["sudo", adbPath, "shell", "input", "keyevent", "--longpress", key])
        else:
            subprocess.call(["sudo", adbPath, "shell", "input", "keyevent", key])
        return u'ok'

class sendText:
    def POST(self):
        text = web.input().text
        subprocess.call(["sudo", adbPath, "shell", "input", "text", text])
        return u'ok'

if __name__ == '__main__':
    app = web.application(urls, globals())
    app.run()
