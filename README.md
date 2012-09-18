Install Nodejs on Ubuntu:

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm

If you install any modules with -g remember to add to PATH
shifter is the only one that needs -g (global) install

    sudo npm install -g shifter
    export NODE_PATH=/usr/lib/node_modules/

build all modules

    cd yui3-u1
    shifter --walk

build current module

    cd yui3-u1/src/multi-component-pattern
    shifter --watch // build current module


See https://github.com/yui/shifter
