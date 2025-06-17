//Ceci est le tableau d'affichage des taches fonctionnel avec les stats des taches effectuées ou non, sans Drag and Drop 

{/*
      <div className ="grid grid-flow-col grid-rows-3 gap-4 p-16">
            <div className ="row-span-3 ...">
                
                      <Card className="w-96">
                          <CardHeader>
                            <CardTitle>Liste des tâches</CardTitle>
                          </CardHeader>
                          <CardContent>
                              <div className="grid gap-1.5 leading-none">
                                <table className="table-auto border border-gray-400 font leading-none tracking-tight">
                                      <tbody>
                                            {tasks.map((task) => (
                                            
                                            <tr key={task.id}>
                                            <td className="table-auto border border-gray-400 w-2/4 p-2"> 
                                              {task.description} - {task.status ? "✅" : "❌"} 
                                            </td>
                                            <td className="table-auto border border-gray-400 w-1/4 p-2">  
                                              <Toggle
                                                status={task.status}
                                                onToggleChange={(newStatus: boolean) => {
                                                  handleStatusChange(task.id, newStatus);
                                                  setRefreshStats((prev) => prev + 1); // ✅ actualise les stats
                                                }}
                                              />
                                            </td>
                                            <td className="table-auto border border-gray-400 w-1/4 p-2">
                                              <button onClick={() => handleDelete(task.id)} style={{ marginLeft: "10px" }}>
                                                  🗑️   
                                              </button>
                                            </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                              </div>
                          </CardContent>
                      </Card>
          </div>

          <div className ="col-span-2 ...">
            <StatsTest key={refreshStats} refreshTrigger={refreshStats}/>
          </div>
      </div>
      */}