require('shelljs/global')

rm('-r', 'ionicons')
mkdir('ionicons')
mkdir('ionicons/fonts')
mkdir('ionicons/css')
cp('-r', 'node_modules/ionicons/fonts', 'ionicons')
cp('node_modules/ionicons/css/ionicons.min.css', 'ionicons/css/ionicons.min.css')
