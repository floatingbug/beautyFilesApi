#!/bin/bash

function make_request(){
	json=$1
	echo "Request:"
	echo "$json" | jq .
	echo
	echo
	echo "response:"
	res=$(curl -s \
		-H "Content-Type: application/json" \
		-d "$json" \
		http://localhost:3000/sign-in
	)
	success=$(echo $res | jq -r ".success")
	if [ "$success" == "true" ]; then
		token=$(echo $res | jq -r ".token")
		export JWT=$token
		echo "JWT is extractet as JWT if this script is called with source."
		echo
	else
		echo "fail to extract token"
	fi
	echo $res
	echo
	echo "------------------------------------"
}

json=$(cat << EOF
{
	"usernameOrEmail": "bob",
	"password": "123456"
}
EOF
)

make_request "$json"
