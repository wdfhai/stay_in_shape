const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    console.log(json)

    return json[json.length - 1];
  },
  async addExercise(workoutData) {
    let a = JSON.stringify(workoutData)
    console.log('workoutData is' + a)

    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      body: JSON.stringify(workoutData),
      headers: { "Content-Type": "application/json" },     
    });

    const json = await res.json();
    console.log(json)

    return json;
  },

  async createWorkout() {
    let data = {};
    const res = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();
    console.log(json)

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
