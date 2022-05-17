var people = {
    name: 'charles',
    say: function () {
        console.log(this);
    }
}

people.say();

var sayPeople = people.say;
sayPeople();
