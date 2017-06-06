for name in  tabs
do
	path=$(cd "$(dirname "$0")";pwd)
    cd src/components
    mkdir $name && cd $name && mkdir style && cd style && touch index.js && touch index.less
    cd .. && touch index.js && touch $name.js
    cd $path
    cd example/pages
    mkdir $name && cd $name && touch index.js
    cd $path
done
