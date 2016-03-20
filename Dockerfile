FROM golang

ADD . /go/src/github.com/vivanov1410/simple-ifta-app
RUN go install github.com/vivanov1410/simple-ifta-app

CMD /go/bin/simple-ifta-app

EXPOSE 80