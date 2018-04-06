using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Challenge : MonoBehaviour {

	public bool completed = false;
	public EscapeRoom room;
	public Light completedLight;
	// Use this for initialization
	public virtual void Start () {
		
	}
	public void SetLight(Light l) {
		completedLight = l;
		print ("completed light activated");
	}

	public void Completed() {
		//room.completed++;
		completed = true;
	}

	// Update is called once per frame
	void Update () {
		if (completed) {
			completedLight.enabled = true;
		}
	}
}
