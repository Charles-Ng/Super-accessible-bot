def csplit(string):
    delimiter = ", "
    stack = [string]
    for char in delimiter:
        pieces = []
        for substr in stack:
            pieces.extend(substr.split(char))
        stack = pieces
        
    if(stack[0] == 'def'):
        del stack[0];
    return stack

import re

def lsplit(block):
    delimiter = "\n"
    
    re.split(delimiter,block)

    return block

string = input("enter:");

print(lsplit(string))