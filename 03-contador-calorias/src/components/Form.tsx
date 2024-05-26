import { Dispatch, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Categories } from "../data/Categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const inititalState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};
export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(inititalState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() != "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "save-activity", paylaod: { newActivity: activity } });
    setActivity({ ...inititalState, id: uuidv4() });
  };

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {Categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          id="name"
          type="text"
          className="border-slate-300 p-2 rounded"
          placeholder="Ej. Comida, Ensaladas - Ejercicios, Pesas"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          id="calories"
          type="number"
          className="border-slate-300 p-2 rounded"
          placeholder="Ej. Comida, Ensaladas - Ejercicios, Pesas"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
