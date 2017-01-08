#!/bin/bash

# hi="cd .."
# $hi
# ls


if [ "$#" -eq 2 ]; then
    printf "" 1> $2

    while read line; do
        if [ ${line:0:3} == "ls" ]; then
            $line 1>> $2
        else 
            $line
            if [ "$?" == 0 ] ; then
                echo "Command executed." 1>> $2 
            else
                echo "Command could not be executed." 1>> $2 
            fi
        fi
        echo " " 1>> $2
    done <$1
else
    echo "Incorrect Usage"
    exit 1
fi
