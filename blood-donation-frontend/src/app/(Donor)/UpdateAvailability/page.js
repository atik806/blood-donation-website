import "./style.css";

export default function UpdateAvailability() {
  return (
    <div className="container">
      <h1>Update Availability</h1>

      <form>
        <div>
          <label>Select Availability Status</label>

          <br />
          <br />

          <select name="available">
            <option value="true">
              Available
            </option>

            <option value="false">
              Unavailable
            </option>
          </select>
        </div>

        <br />

        <button type="submit">
          Update Status
        </button>
      </form>
    </div>
  );
}