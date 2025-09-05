import React from "react";

const page = () => {
  // Helper function to get doctor name by ID
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor ? doctor.name : "Unknown Doctor";
  };
  // Helper function to generate serial number
  const generateSerialNumber = (doctorId, date) => {
    const sameDocSameDay = confirmedAppointments.filter(
      (app) => app.doctorId === doctorId && app.date === date
    );
    return sameDocSameDay.length + 1;
  };

  // Add new doctor
  const addDoctor = () => {
    if (doctorForm.name && doctorForm.specialty) {
      const newDoctor = {
        id: Date.now(),
        ...doctorForm,
      };

      // Save to Firebase (auto ID from push)
      set(push(ref(db, "doctorList/")), {
        ...doctorForm,
      })
        .then(() => {
          console.log("Data send");
        })
        .catch((error) => {
          console.log(error);
        });

      // Update local state
      setDoctors([...doctors, newDoctor]);

      // Reset form
      setDoctorForm({
        name: "",
        specialty: "",
        phone: "",
        hospital: "",
        experience: "",
        study: "",
        email: "",
        bio: "",
        image: "",
      });
    }
  };

  // Delete doctor
  const deleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor();
    console.log("Doctor data:", doctorForm);
    // 👉 Here you can add Firebase save logic
  };

  return (
    <div className="space-y-6">
      {/* Add Doctor Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          value={doctorForm.name}
          onChange={handleChange}
          placeholder="Doctor Name"
          className="w-full p-2 border rounded"
        />

        {/* Specialty */}
        <input
          type="text"
          name="specialty"
          value={doctorForm.specialty}
          onChange={handleChange}
          placeholder="Specialty"
          className="w-full p-2 border rounded"
        />

        {/* Phone */}
        <input
          type="text"
          name="phone"
          value={doctorForm.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 border rounded"
        />

        {/* Hospital */}
        <input
          type="text"
          name="hospital"
          value={doctorForm.hospital}
          onChange={handleChange}
          placeholder="Hospital"
          className="w-full p-2 border rounded"
        />

        {/* Experience */}
        <input
          type="number"
          name="experience"
          value={doctorForm.experience}
          onChange={handleChange}
          placeholder="Experience (Years)"
          className="w-full p-2 border rounded"
        />

        {/* Study */}
        <input
          type="text"
          name="study"
          value={doctorForm.study}
          onChange={handleChange}
          placeholder="Study / University"
          className="w-full p-2 border rounded"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={doctorForm.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />

        {/* Bio */}
        <textarea
          name="bio"
          value={doctorForm.bio}
          onChange={handleChange}
          placeholder="Doctor Bio"
          rows="4"
          className="w-full p-2 border rounded"
        />

        {/* Image URL */}
        <input
          type="text"
          name="image"
          value={doctorForm.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Save Doctor
        </button>
      </form>

      {/* Doctors List */}
      <div className="bg-white/20 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Current Doctors</h2>
        <div className="grid gap-4">
          {doctorsList.map((doctor) => (
            <div
              key={doctor.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <User className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{doctor.phone}</p>
                </div>
              </div>
              <button
                onClick={() => deleteDoctor(doctor.id)}
                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
