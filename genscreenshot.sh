#!/bin/bash
DELAY=0.75
echo Generating Screenshots at DELAY = $DELAY
while [[ 1 ]]; do sudo adb shell screencap -p | perl -pe 's/\x0D\x0A/\x0A/g' > screen2.png; mv screen2.png static/screen.png ; sleep 1; done
