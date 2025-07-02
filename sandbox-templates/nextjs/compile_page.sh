function ping_server() {
    counter=0

    # TODO: Change to HTTPS on prod
    response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
    while [[ ${response} -ne 200 ]]; do
        ((counter++))
        if (( counter % 20 == 0 )); then
            echo "Waiting for server to start..."
        fi
        sleep 0.1
        response=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000")
    done
}

ping_server &
cd /home/user && npx next dev --turbopack