<form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </section>

                  {/* Job Details */}
                  <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                      Job Details
                    </h2>
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Cover Letter
                      </label>
                      <textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                        rows="6"
                        placeholder="Explain why you're a good fit for this role"
                      />
                    </div>
                  </section>

                  {/* Experience and Education */}
                  <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                      Experience & Education
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Work Experience
                        </label>
                        <textarea
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                          rows="4"
                          placeholder="Describe your previous roles and responsibilities"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium">
                          Education
                        </label>
                        <textarea
                          name="education"
                          value={formData.education}
                          onChange={handleChange}
                          className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                          rows="4"
                          placeholder="List your educational background"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Resume Upload */}
                  <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                      Resume Upload
                    </h2>
                    <div>
                      <label className="block text-gray-700 font-medium">
                        Upload Resume
                      </label>
                      <input
                        type="file"
                        name="resume"
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md p-3 focus:border-blue-500 focus:outline-none"
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </div>
                  </section>

                  {/* Submit Button */}
                  <div className="text-center mt-8">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200"
                    >
                      Submit Application
                    </button>
                  </div>
                </form>