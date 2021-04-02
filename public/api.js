const API = {
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    console.log(res)
    const json = await res.json();

    console.log(json)

    return json[json.length - 1];
  },
  async addExercise(workoutData) {
    // console.log(workoutData)
    const id = location.search.split("=")[1];
    // console.log(id)

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workoutData)
    });

    const json = await res.json();

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
    console.log(res)
    console.log(json)

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
