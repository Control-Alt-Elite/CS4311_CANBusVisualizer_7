modprobe vcan
ip link add dev vcan0 type vcan
ip link set up vcan0
ifconfig vcan0
cangen vcan0 -e -L 8 -g 1000 -v
