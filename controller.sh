#!/bin/bash

if [ "$#" -eq 0 ]
then
    echo "Incorrect Usage"
    exit
else
    final=""
    for element in "$@"
    do
        final="$final $element"
    done
    
    $final 2>/dev/null
    if [ "$?" == "0" ] ;
    then
        echo "Command executed"
    else
        echo "NAH, BAD COMMAND"
    fi
fi
