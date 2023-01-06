//import * as Tone from 'tone';

export class synthetizerSampler {
  constructor() {
    this.sampler = new Tone.Synth().toDestination();
  }

  play(note) {
    this.sampler.triggerAttackRelease(note, '8n');
  }
}
