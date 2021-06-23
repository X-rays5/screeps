tsc --build
DIR=$screeps_build
cd build
cp -R ./. $DIR/127_0_0_1___21025/default || echo "copy failed"