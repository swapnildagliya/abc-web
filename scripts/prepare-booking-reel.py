"""Join the seven approved ABC excerpts into one reliable browser video."""
from pathlib import Path
import subprocess
ROOT = Path(__file__).resolve().parents[1]
CLIPS = ['booking/desi-girl', 'booking/garba', 'showcase/semiclassical-abc', 'booking/ghoomar', 'booking/ghagra', 'booking/raataan-lambiyan', 'booking/namak']
cmd = ['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-filter_complex_threads', '1']
for clip in CLIPS:
    cmd += ['-ss', '0.15', '-t', '3.7', '-i', str(ROOT / f'assets/media/{clip}-hd.mp4')]
filters = [f'[{i}:v]scale=960:540:force_original_aspect_ratio=decrease,pad=960:540:(ow-iw)/2:(oh-ih)/2,fps=30,setsar=1,settb=AVTB,setpts=PTS-STARTPTS[v{i}]' for i in range(7)]
last = 'v0'
for i in range(1, 7):
    out = f'x{i}'
    filters.append(f'[{last}][v{i}]xfade=transition=fade:duration=0.7:offset={i*3}[{out}]')
    last = out
cmd += ['-filter_complex', ';'.join(filters), '-map', f'[{last}]', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(ROOT / 'assets/media/booking/highlights.mp4')]
subprocess.run(cmd, check=True)
